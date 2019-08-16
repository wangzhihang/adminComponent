<template>
    <div class="side-menu-item" >
        <Submenu :name="parentItem.name">
            <template slot="title">
                <common-icon :type="parentItem.meta.icon || ''"/>
                <span>{{ parentItem.meta.title }}</span>
            </template>
            <template v-for="item in parentItem.children">
                <!-- 三级菜单 -->
                <template v-if="item.children&&item.children.length>=1">
                    <side-menu-item :key="`menu-${item.name}`" :parentItem="item"></side-menu-item>
                </template>
                <!-- 二级菜单 -->
                <template v-else>
                    <menu-item :key="`menu-${item.name}`" :name="item.name" @click.native="toRouter(parentItem.name,item.name,parentItem.meta.title,item.meta.title)">
                        <common-icon :type="item.meta.icon || ''"/>
                        <span>{{ item.meta.title }}</span>
                    </menu-item>
                </template>
            </template>
        </Submenu>
    </div>
</template>
<script>
import CommonIcon from '@/components/common-icon'
export default {
    name: 'SideMenuItem',
    components:{
        CommonIcon
    },
    props:{
        parentItem: {
			type: Object,
			default () {
				return []
			}
        }
    },
    data () {
        return {
        }
    },
    mounted(){
    },
    methods: {
        toRouter(parentRouter,childRouter,parentTitle,childTitle){
            console.log('toRouter=='+parentRouter+'  '+childRouter)
            let arr=[
                {'title':parentTitle,'icon':'','router':''},
                {'title':childTitle,'icon':'','router':''}
            ];
            this.$store.commit("getBreadCrumbList",arr)
			this.$router.push({ path: '/'+parentRouter+'/'+childRouter })
		}
    }
}
</script>