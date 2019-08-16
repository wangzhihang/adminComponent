<template>
    <div class="collapsed-menu" >
         <Dropdown ref="dropdown" :class="hideTitle ? '' : 'collased-menu-dropdown'" :transfer="hideTitle" :placement="placement">
            <a class="drop-menu-a"  type="text" @mouseover="handleMousemove($event, parentItem.children)" :style="{textAlign: !hideTitle ? 'left' : ''}">
                <common-icon :size="rootIconSize" :type="parentItem.meta.icon"/>
                <p class="menu-title">{{ subString(parentItem.meta.title)}}</p>
            </a>
            <DropdownMenu ref="dropdown" slot="list">
                <template v-for="item in parentItem.children">
                    <!-- 三级菜单 -->
                    <Dropdown v-if="item.children&&item.children.length>=1" :key="`drop-${item.name}`" :placement="placement" :transfer="hideTitle">
                        <DropdownItem>
                            <common-icon :type="item.meta.icon"/>
                            <span class="menu-title">{{ item.meta.title }}</span>
                        </DropdownItem>
                        <template v-for="item in item.children">
                            <DropdownMenu slot="list" :key="`drop-${item.name}`" :name="item.name">
                                <DropdownItem>
                                     <common-icon :type="item.meta.icon"/>
                                    <span class="menu-title">{{ item.meta.title }}</span>
                                </DropdownItem>
                            </DropdownMenu >
                        </template>
                    </Dropdown>
                   
                    <!-- 二级菜单 -->
                    <DropdownItem v-else :key="`drop-${item.name}`" :name="item.name" @click.native="toRouter(parentItem.name,item.name,parentItem.meta.title,item.meta.title)">
                        <common-icon :type="item.meta.icon"/>
                        <span class="menu-title">{{ item.meta.title }}</span>
                    </DropdownItem>
                </template>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
import CommonIcon from '@/components/common-icon'
export default {
    name: 'CollapsedMenu',
    components:{
        CommonIcon
    },
    props:{
        parentItem: {
			type: Object,
			default () {
				return []
			}
        },
        hideTitle: {
            type: Boolean,
            default: false
        },
        rootIconSize: {
            type: Number,
            default: 16
        }
    },
    data () {
        return {
            placement: 'right'
        }
    },
    mounted(){
        
    },
    methods: {
        handleMousemove (event, children) {
            const { pageY } = event
            const height = children.length * 38
            const isOverflow = pageY + height < window.innerHeight
            this.placement = isOverflow ? 'right-start' : 'right-end'
        },
         subString (item) {
            return item.substring(0, 2)
        },
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