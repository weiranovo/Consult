import SvgIcon from "@/components/cp-icon.vue";
import cpRadioBtn from "@/components/cp-radio-btn.vue";
const allComponents: any = { SvgIcon,cpRadioBtn }
export default{
    install(app:any){
        Object.keys(allComponents).forEach((key) => {
            app.component(key, allComponents[key])
        })
    }
}