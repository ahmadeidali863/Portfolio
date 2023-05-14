export interface Category {
  id : string,
  userName : string ;
  title: string;
  description: string;
  previewImage:string;
  previewImageFile : File | undefined;
}