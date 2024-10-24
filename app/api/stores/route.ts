import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"


export const POST = async (req : Request) => {
    try {
        const { userId } = await auth()
        const body = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }

        const { name } = body;
        if (!name) {
            return new NextResponse("Store name is missing", {status: 400})
        }

        const storeData = {
            name,
            userId,
            createdAt: serverTimestamp()
        };

        //Add data to firestore and retrieve ref id
        const storeRef = await addDoc(collection(db, "stores"), storeData)

        //Get ref Id
        const id = storeRef.id

        await updateDoc(doc(db, "stores", id), {
            ...storeData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({id, ...storeData})

    } catch (error) {
        console.log(`STORES_POST:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}