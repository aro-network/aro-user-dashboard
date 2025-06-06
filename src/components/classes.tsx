import { PaginationProps } from "@nextui-org/react";

const paginationItemClassname = "rounded-full hover:!bg-white/10"
const paginationCursorClassname = "rounded-full bg-primary"
export const PaginationClassNames: PaginationProps['classNames'] = {
    item: paginationItemClassname,
    cursor: paginationCursorClassname,
}

export const loginTitleClassName = "font-medium text-3xl mt-auto smd:mt-0 mb-2.5  smd:text-xl"