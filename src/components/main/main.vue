<template>
    <div class="main" >
        <Layout style="height: 100%;">
            <header-bar :collapsed="collapsed"></header-bar>
            <Layout>
                <Sider hide-trigger collapsible :width="250" :collapsed-width="50" v-model="collapsed" :class="[!collapsed?'left-sider rel':'miniLeftSide']" :style="{overflow: 'hidden'}" style="margin:15px 0 10px 10px">
                    <side-menu ref="sideMenu"  :collapsed="collapsed" :menu-list="menuList">
                    </side-menu>
                    <div class="abs" style="bottom:0;" v-show="!collapsed">
                        <img src="../../assets/img/3.jpg" style="width:100%;height:26vh;">
                    </div>
                </Sider>
                <Layout :style="{margin:'15px 10px 10px 15px',textAlign:'left'}">
                    <sider-trigger-right :collapsed="collapsed" @on-change="handleCollapsedChange"></sider-trigger-right>
                    <bread-crumb :breadCrumbList="breadCrumbList" ></bread-crumb>
                    <Content :style="{marginTop: '10px', minHeight: '280px',width:'100%'}">
                        <!-- Content -->
                        <keep-alive >
                            <router-view/>
                        </keep-alive>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
 
    </div>
</template>
<script>
import HeaderBar from './components/header-bar'
import SideMenu from './components/side-menu'
import siderTriggerRight from './components/sider-trigger-right'
import BreadCrumb from '@/components/main/components/bread-crumb'
import './main.less'

export default {
    name: 'Main',
    components:{
        HeaderBar,
        SideMenu,
        siderTriggerRight,
        BreadCrumb
    },
    data () {
        return {
            value:1,
            collapsed:false,
            menusList:[]
        }
    },
    mounted(){
        this.eve_breadcrumbItem_change()
    },
    computed:{
        menuList () {
            // console.log('??=='+this.$store.getters.menuList)
            return this.$store.getters.menuList
        },
        breadCrumbList(){
            return this.$store.state.app.breadCrumbList
        }
    },
    watch: {
        '$route'(to, from) {
            this.eve_breadcrumbItem_change()
        }
    },
    methods: {
        handleCollapsedChange (state) {
            this.collapsed = state
        },
        eve_breadcrumbItem_change(){
            let list = this.$route.fullPath.split('/')//list[0]:是空格
            this.menusList=this.$store.getters.menuList;
            for(let i=0;i<this.menusList.length;i++){
                for(let j=0;j<list.length;j++){
                    let menusListChild=this.menusList[i].children;
                    if(menusListChild.length==1){
                        if(list[j]==this.menusList[i].name){
                            this.$store.commit("getBreadCrumbList",[{'title':menusListChild[0].meta.title,'icon':'','router':''}])
                        }
                    }else if(menusListChild.length>1){
                        let arr=[{'title':this.menusList[i].meta.title,'icon':'','router':''}]
                        for(let k=1;k<menusListChild.length;k++){
                            if(list[j]==menusListChild[k].name){
                                arr.push({'title':menusListChild[k].meta.title,'icon':'','router':''})
                                this.$store.commit("getBreadCrumbList",arr)
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>