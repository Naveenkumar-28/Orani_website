import ejs from "ejs";
import path from "path";
import { sendMail } from "../sendMail";
import { WEB_SITE_NAME } from "@/constants";

type EmailData = {
    to: string;
    customerName: string;
    orderId: string;
    items: { name: string; quantity: number; price: number }[];
    subtotal: number;
    discount: number;
    deliveryCharge: number;
    totalAmount: number;
};

export const sendOrderSuccessEmail = async (data: EmailData) => {

    const { customerName: name, deliveryCharge, discount, subtotal, totalAmount, ...rest } = data

    const formattedName = name.split('').map(((i, index) => { return 0 == index ? i.toUpperCase() : i.toLowerCase() })).join('')

    const templatePath = path.join(process.cwd(), "templates", "orderPlaced", "orderPlaced.ejs");

    const html = await ejs.renderFile(templatePath, {
        customerName: formattedName,
        discount: discount ? `-₹${discount.toFixed(2)}` : `₹${discount.toFixed(2)}`,
        deliveryCharge: deliveryCharge ? `₹${deliveryCharge.toFixed(2)}` : `free`,
        subtotal: subtotal.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        ...rest,
        storeName: WEB_SITE_NAME,
        year: new Date().getFullYear(),
    });

    await sendMail(data.to, `Order #${data.orderId} Confirmed`, html)

};
