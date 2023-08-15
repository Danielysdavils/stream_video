import i18n from "@/lang/i18n";

export default class Lenguages{

    constructor(leng){
        this.Lenguages = leng;
    }

    setLenguages(){
        switch (this.Lenguages){
            case 'english':
           
                i18n.locale = 'br';
                break;
            case 'portuguese':
                
                i18n.locale = 'en';
                break;
            case 'spanish':
           
                i18n.locale = 'es';
                break; 
        }
    }
}