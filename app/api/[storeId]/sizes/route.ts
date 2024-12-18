import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import {  Sizes } from "@/types-db"


export const POST = async (req : Request, {params} : {params: {storeId : string}}) => {
    try {
        const { userId } = await auth()
        const body = await req.json()
        console.log(body)
        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name, value } = body;
        if (!name) {
            return new NextResponse("Category name is missing", {status: 400})
        }
        if (!value) {
            return new NextResponse("Billboard ID is missing", {status: 400})
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

        const sizeData = {
            name,
            value,
            createdAt: serverTimestamp(),
        };

        const sizeRef = await addDoc(
            collection(db, "stores", params.storeId, "sizes"),
            sizeData
        );

        const id = sizeRef.id;

        await updateDoc(doc(db, "stores", params.storeId, "sizes", id), {
            ...sizeData,
            id,
            updatedAt: serverTimestamp()
        })
        return NextResponse.json({ id, ...sizeData });

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

        const sizesData = (
            await getDocs(
                collection(doc(db, "stores", params.storeId), "sizes")
            )
        ).docs.map(doc => doc.data()) as Sizes[];

        return NextResponse.json(sizesData);
        
    } catch (error) {
        console.log(`CATEGORIES_GET:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}