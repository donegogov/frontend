import { ImageSearchMappingDto } from "./image-search-mapping-dto";

export interface CategoryForHomePageSearch {

        name: string;
        description: string;
        parent_category_id: number;
        show_on_home_page: boolean;
        include_in_top_menu: boolean;
        published: boolean;
        display_order: number;
        id: number;
        image: ImageSearchMappingDto;
}