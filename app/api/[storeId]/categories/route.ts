import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Billboards } from "@/types-db"


export const POST = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        const { userId } = await auth()
        const body = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name, billboardId, billboardLabel } = body;
        if (!name) {
            return new NextResponse("Category name is missing", {status: 400})
        }
        if (!billboardId) {
            return new NextResponse("Billboard ID is missing", {status: 400})
        }
        if (!billboardLabel) {
            return new NextResponse("Billboard Label is missing", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            let storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        const categoryData = {
            name,
            billboardId,
            billboardLabel,
            createdAt: serverTimestamp(),
        };

        const categoryRef = await addDoc(
            collection(db, "stores", params.storeId, "categories"),
            categoryData
        );

        const id = categoryRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "billboards", id), {
            ...categoryData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ id, ...categoryData });

    } catch (error) {
        console.log(`BILLBOARDS_POST:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const GET = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        
        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const billboardsData = (
            await getDocs(
                collection(doc(db, "stores", params.storeId), "billboards")
            )
        ).docs.map(doc => doc.data()) as Billboards[];

        return NextResponse.json(billboardsData);
        
    } catch (error) {
        console.log(`BILLBOARDS_GET:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}