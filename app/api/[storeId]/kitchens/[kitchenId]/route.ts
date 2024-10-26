import { db } from "@/lib/firebase";
import {  Kitchen } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export const PATCH = async (req: Request,
    { params }:
        { params: { storeId: string, kitchenId: string } }) =>
{
    
    try {
        const { userId } = await auth()
        const body = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name, value } = body;
        if (!name) {
            return new NextResponse("Size name is missing", {status: 400})
        }
        if (!value) {
            return new NextResponse("Value is missing", {status: 400})
        }
        


        if (!params.storeId) {
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if (!params.kitchenId) {
            return new NextResponse("Size Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            const storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        

        const kitchenRef = await getDoc(
            doc(db, "stores", params.storeId, "kitchens", params.kitchenId)
        )

        if (kitchenRef.exists()) {
            await updateDoc(doc(db, "stores", params.storeId, "kitchens", params.kitchenId), {
                    ...kitchenRef.data(),
                    name,
                   value,
                    updatedAt: serverTimestamp(),
                }
            )
        } else {
            return new NextResponse("Kitchen not found")
        }

        const kitchen = (
            await getDoc(doc(db, "stores", params.storeId, "kitchens", params.kitchenId))
        ).data() as Kitchen

        return NextResponse.json(kitchen);

    } catch (error) {
        console.log(`KITCHEN_PATCH:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export const DELETE = async (req: Request,
    { params }:
    { params: { storeId: string, kitchenId: string } }) =>
{
    
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }


        if (!params.storeId) {
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if (!params.kitchenId) {
            return new NextResponse("Category Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            const storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        

        const kitchenRef = doc(db, "stores", params.storeId, "kitchens", params.kitchenId);
        await deleteDoc(kitchenRef);

        return NextResponse.json({msg: "KITCHEN deleted"});

    } catch (error) {
        console.log(`KITCHEN_DELETE:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}