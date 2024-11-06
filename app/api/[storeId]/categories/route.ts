import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Categories } from "@/types-db"


export const POST = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        const { userId } = await auth()
        const body = await req.json()
        console.log(body)
        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name } = body;
        if (!name) {
            return new NextResponse("Category name is missing", {status: 400})
        }
        

        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            const storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        const categoryData = {
            name,
            createdAt: serverTimestamp(),
        };

        const categoryRef = await addDoc(
            collection(db, "stores", params.storeId, "categories"),
            categoryData
        );

        const id = categoryRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "categories", id), {
            ...categoryData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ id, ...categoryData });

    } catch (error) {
        console.log(`CATEGORY_POST:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const GET = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        
        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const categoriesData = (
            await getDocs(
                collection(doc(db, "stores", params.storeId), "categories")
            )
        ).docs.map(doc => doc.data()) as Categories[];

        return NextResponse.json(categoriesData);
        
    } catch (error) {
        console.log(`CATEGORIES_GET:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}