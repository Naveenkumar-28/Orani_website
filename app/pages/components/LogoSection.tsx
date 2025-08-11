import { WEB_SITE_NAME } from "@/constants";
import Link from "next/link";

export function LogoSection() {
    return (
        <div className="lg:w-3/12 w-full h-full flex items-center justify-between">
            <Link href={'/pages'} className='text-[1.7rem] xl:text-3xl text-green font-sans font-bold uppercase'>{WEB_SITE_NAME}</Link>
        </div>
    );
}
