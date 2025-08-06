import React, { SetStateAction } from 'react'
import { CategoryList } from './CategoryList'
import { RecentBlogsSection } from './RecentBlogsSection'
import { TagCard } from './TagCard'
import { BlogPragraph } from './BlogPragraph'
import { BlogSearchInput } from './BlogSearchInput'

type BlogRightSectionPropsType = {
    search: string,
    setSearch: React.Dispatch<SetStateAction<string>>
}

export function BlogRightSection({ search, setSearch }: BlogRightSectionPropsType) {
    return (
        <section className="lg:w-4/12 w-full h-full gap-20 flex flex-col">

            {/* <!--Large device Search  --> */}
            <BlogSearchInput search={search} setSearch={setSearch} className='hidden lg:flex' />

            {/* <!-- Categorie  --> */}
            <CategoryList />

            {/* <!-- Recent Blog --> */}
            <RecentBlogsSection />

            {/* <!-- Tag Cloud  --> */}
            <TagCard />

            {/* <!-- Paragraph  --> */}
            <BlogPragraph />

        </section>
    )
}
