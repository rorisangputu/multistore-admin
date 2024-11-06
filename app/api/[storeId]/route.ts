import { NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "@/lib/firebase"
import { Store } from "@/types-db"
import { deleteObject, ref } from "firebase/storage"


export const PATCH = async (req : Request, {params}: {params:{storeId: string}}) => {
    try {
        const { userId } = await auth()
        const body = await req.json()
        console.log("Whaat?:",body);

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
            
        }

        const { name } = body;
        if (!name) {
            return new NextResponse("Store name is missing", {status: 400})
        }

        const docRef = doc(db, "stores", params.storeId);
        await updateDoc(docRef, { name });
        const store = (await getDoc(docRef)).data() as Store

        return NextResponse.json(store);

    } catch (error) {
        console.log(`STORES_PATCH:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export const DELETE = async (req : Request, {params}: {params:{storeId: string}}) => {
    try {
        const { userId } = await auth()
       

        if (!userId) {
            return new NextResponse("Unauthorised", {status: 400})
            
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required", {status: 400})
            
        }


        const docRef = doc(db, "stores", params.storeId);

        //TODO : Delete all the subcollections along with associated data

        //Billboards and its images
        const billboardsQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/billboards`)
        );

        billboardsQuerySnapshot.forEach(async (billboardDoc) => {
            await deleteDoc(billboardDoc.ref)

            //remove the images from storage
            const imageUrl = billboardDoc.data().imageUrl
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl)
                await deleteObject(imageRef)
            }
        })

        // Categories 

        const categoriesQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/categories`)
        );
        categoriesQuerySnapshot.forEach(async (categoryDoc) => {
            await deleteDoc(categoryDoc.ref)
        });

        //Sizes

        const sizesQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/sizes`)
        );
        sizesQuerySnapshot.forEach(async (sizeDoc) => {
            await deleteDoc(sizeDoc.ref)
        });

        //Kitchens
        const kitchenQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/kitchens`)
        );
        kitchenQuerySnapshot.forEach(async (kitchenDoc) => {
            await deleteDoc(kitchenDoc.ref)
        });

        //Cuisines
        const cuisineQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/cuisines`)
        );
        cuisineQuerySnapshot.forEach(async (cuisineDoc) => {
            await deleteDoc(cuisineDoc.ref)
        });

        //Products
        const productsQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/products`)
        );

        productsQuerySnapshot.forEach(async (productDoc) => {
            await deleteDoc(productDoc.ref);

            //remove the images from the storage
            const imagesArray = productDoc.data().images;
            if (imagesArray && Array.isArray(imagesArray)) {
                await Promise.all(
                    imagesArray.map(async (image) => {
                        const imageRef = ref(storage, image.url);
                        await deleteObject(imageRef);
                    })
                );
            }
        });

        //Orders 9:56
        const ordersQuerySnapshot = await getDocs(
            collection(db, `stores/${params.storeId}/orders`)
        );

        ordersQuerySnapshot.forEach(async (orderDoc) => {
            await deleteDoc(orderDoc.ref)

            const ordersItemArray = orderDoc.data().orderItems;
            if (ordersItemArray && Array.isArray(ordersItemArray)) {
                await Promise.all(
                    ordersItemArray.map(async (orderItem) => {
                        const itemImagesArray = orderItem.images;
                        if (itemImagesArray && Array.isArray(itemImagesArray)) {
                            await Promise.all(
                                itemImagesArray.map(async (image) => {
                                    const imageRef = ref(storage, image.url);
                                    await deleteObject(imageRef);
                                })
                            );
                        }
                    })
                );
            }
        });


        await deleteDoc(docRef);

        return NextResponse.json({msg: "Store and its subcollections deleted"});

    } catch (error) {
        console.log(`STORES_DELETE:${error}`)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}