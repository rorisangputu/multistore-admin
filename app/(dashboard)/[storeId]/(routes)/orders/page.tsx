import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/types-db";
import { format } from "date-fns";
import OrderClient from "./components/client";
import { OrderColumns } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrderIndex = async ({ params }: { params: { storeId: string } }) => {
  const ordersData = (
    await getDocs(collection(doc(db, "stores", params.storeId), "orders"))
  ).docs.map((doc) => doc.data()) as Order[];

  // console.log("Orders Data:", ordersData);
  // ordersData.forEach((order, index) => {
  //   console.log(`Order ${index}:`, order);
  //   console.log("Order Items:", order?.orderItem);
  // });

  const formattedOrders: OrderColumns[] = ordersData.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products:
      item.orderItem?.map((item) => item.name).join(", ") || "No products",
    orderStatus: item.order_status,
    totalPrice: formatter.format(
      item.orderItem?.reduce((total, item) => {
        if (item && item.qty !== undefined) {
          return total + Number(item.price * item.qty);
        }
        return total;
      }, 0)
    ),
    images: item.orderItem?.map((item) => item.images[0].url),
    createdAt: item.createdAt
      ? format(item.createdAt.toDate(), "do MMMM, yyyy")
      : "",
  }));

  //console.log("Formatted Data: ", formattedOrders);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderIndex;
