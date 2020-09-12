import { Packets} from './packets.model';

export class Product {
    public name: String;
    public image: String;
    public weight: Number;
    public measure: String;
    public price: Number;
    public mrp: Number;
    public available: Boolean;
    public category: String;
    public subCategory: String;
    public packets : Packets[];

    constructor(name: String , description: String, imagePah: String, packets: Packets[]) {
        this.name = name;
        this.image = imagePah
        this.packets = packets;
    }
}