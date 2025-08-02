"use client"
import { Button } from "@/components";
import { useContactHandler } from "../hooks";
import { Input } from "./Input";

export function ContactSection() {
    const { isLoading, validateContactForm, contactFormData } = useContactHandler()

    return (
        <section
            className="flex flex-col lg:flex-row container lg:gap-10 gap-20 lg:px-20 mx-auto md:px-20 sm:px-5 px-5 2xl:px-52 mb-30">
            <iframe className="lg:w-6/12 w-full"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120740.26519494173!2d79.77227480911309!3d11.930066574620193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1741860230129!5m2!1sen!2sin"
                width="600" height="450" style={{ border: 0 }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            <form className="lg:w-6/12 w-full flex flex-col gap-5">
                {contactFormData.map((field, index) => {
                    return <Input key={index} {...field} />
                })}
                <Button title='Send Message' loading={isLoading} disabled={isLoading} loadingContent='Sending . . .' onClick={validateContactForm} />
            </form>

        </section>
    )
}
