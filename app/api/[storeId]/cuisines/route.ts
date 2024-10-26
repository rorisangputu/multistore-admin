import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Cuisines } from "@/types-db"


export const POST = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        const { userId } = await auth()
        const body = await req.json()
        //console.log(body)
        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name, value } = body;
        if (!name) {
            return new NextResponse("Cuisine name is missing", {status: 400})
        }
        if (!value) {
            return new NextResponse("Value is missing", {status: 400})
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

        const cuisineData = {
            name,
            value,
            createdAt: serverTimestamp(),
        };

        const kitchenRef = await addDoc(
            collection(db, "stores", params.storeId, "cuisines"),
            cuisineData
        );

        const id = kitchenRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "cuisines", id), {
            ...cuisineData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ id, ...cuisineData });

    } catch (error) {
        console.log(`CUISINE_POST:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const GET = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        
        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const cuisineData = (
            await getDocs(
                collection(doc(db, "stores", params.storeId), "cuisines")
            )
        ).docs.map(doc => doc.data()) as Cuisines[];

        return NextResponse.json(cuisineData);
        
    } catch (error) {
        console.log(`CUISINE_GET:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}