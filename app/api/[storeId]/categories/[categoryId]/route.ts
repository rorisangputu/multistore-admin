import { db } from "@/lib/firebase";
import { Billboards, Categories } from "@/types-db";
import { auth } from "@clerk/nextjs/server";
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


export const PATCH = async (req: Request,
    { params }:
        { params: { storeId: string, categoryId: string } }) =>
{
    
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
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if (!params.categoryId) {
            return new NextResponse("Billboard Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            let storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        

        const categoryRef = await getDoc(
            doc(db, "stores", params.storeId, "categories", params.categoryId)
        )

        if (categoryRef.exists()) {
            await updateDoc(doc(db, "stores", params.storeId, "categories", params.categoryId), {
                    ...categoryRef.data(),
                    name,
                    billboardLabel,
                    billboardId,
                    updatedAt: serverTimestamp(),
                }
            )
        } else {
            return new NextResponse("Billboard not found")
        }

        const category = (
            await getDoc(doc(db, "stores", params.storeId, "categories", params.categoryId))
        ).data() as Categories

        return NextResponse.json(category);

    } catch (error) {
        console.log(`CATEGORIES_PATCH:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export const DELETE = async (req: Request,
    { params }:
    { params: { storeId: string, categoryId: string } }) =>
{
    
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }


        if (!params.storeId) {
            return new NextResponse("Store Id is missing", {status: 400})  
        }

        if (!params.categoryId) {
            return new NextResponse("Category Id is missing", {status: 400})  
        }

        const store = await getDoc(doc(db, "stores", params.storeId));

        if (store.exists()) {
            let storeData = store.data();
            if (storeData?.userId !== userId) {
                return new NextResponse("Unauthorized access", { status: 500 });
            }
        }

        

        const categoryRef = doc(db, "stores", params.storeId, "categories", params.categoryId);
        await deleteDoc(categoryRef);

        return NextResponse.json({msg: "Category deleted"});

    } catch (error) {
        console.log(`CATEGORY_DELETE:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}