import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Kitchen } from "@/types-db"


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
            return new NextResponse("Kitchen name is missing", {status: 400})
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

        const kitchenData = {
            name,
            value,
            createdAt: serverTimestamp(),
        };

        const kitchenRef = await addDoc(
            collection(db, "stores", params.storeId, "kitchens"),
            kitchenData
        );

        const id = kitchenRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "kitchens", id), {
            ...kitchenData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ id, ...kitchenData });

    } catch (error) {
        console.log(`SIZE_POST:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const GET = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        
        if (!params.storeId) {
            return new NextResponse("Unauthorised", {status: 400})  
        }

        const kitchensData = (
            await getDocs(
                collection(doc(db, "stores", params.storeId), "kitchens")
            )
        ).docs.map(doc => doc.data()) as Kitchen[];

        return NextResponse.json(kitchensData);
        
    } catch (error) {
        console.log(`KITCHEN_GET:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}