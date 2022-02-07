import { ImageMappingDto } from "./image-mapping-dto";

export interface ProductsForHomePageSearch {

        id: number;
        name: string;
        short_description: string;
        full_description: string;
        show_on_home_page?: boolean;
        price: number;
        old_price?: number;
        product_cost?: number; 
        special_price?: number;
        display_order?: number;
        published?: boolean;
        deleted?: boolean;
        images: ImageMappingDto[];
}