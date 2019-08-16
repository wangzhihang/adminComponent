<template>
    <div class="side-menu-wrapper" >
		<slot></slot>
		<Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" accordion :theme="theme" width="auto">
			<template v-for="item in menuList">
				<template v-if="item.children && item.children.length === 1" >
					<menu-item :key="`menu-${item.name}`" :name="item.name" @click.native="toRouter(item.name,item.children[0].meta.title)">
						<common-icon :type="item.children[0].meta.icon || ''"/>
						<template>
							<span>{{item.children[0].meta.title}}</span>
						</template>
					</menu-item>
				</template>
				<template v-if="item.children && item.children.length > 1" >
					<side-menu-item :key="`menu-${item.name}`" :parentItem="item"></side-menu-item>
				</template>
			</template>
		</Menu>

		<!-- 折叠菜单 -->
		<div class="menu-collapsed" v-show="collapsed">
			<template v-for="item in menuList">
				<collapsed-menu hide-title  v-if="item.children && item.children.length > 1" :parentItem="item" :root-icon-size="rootIconSize" :key="`drop-menu-${item.name}`"></collapsed-menu>
				<Tooltip v-if="item.children && item.children.length === 1" theme="light"  placement="right" :transfer="true" :content="item.children[0].meta.title||item.meta.title" :key="`drop-menu-${item.name}`">
					<a class="drop-menu-a" :style="{textAlign: 'center'}" @click="toRouter(item.name,item.children[0].meta.title)">
						<common-icon :size="rootIconSize" :type="item.icon || (item.children && item.children[0].meta.icon)"/>
						<p>{{subString(item.children[0].meta.title)}}</p>
					</a>
				</Tooltip>
			</template>
		</div>
    </div>
</template>
<script>
import './side-menu.less'
import SideMenuItem from './side-menu-item'
import collapsedMenu from './collapsed-menu'
import CommonIcon from '@/components/common-icon'
// import mixin from './mixin'
export default {
    name: 'SideMenu',
    components:{
		SideMenuItem,
		collapsedMenu,
		CommonIcon
    },
    props: {
		menuList: {
			type: Array,
			default () {
				return []
			}
		},
		collapsed: {
			type: Boolean
		}
  },
    data () {
        return {
			activeName: '',
			openedNames:[],
			rootIconSize:20,
			iconSize:16,
			theme:'light'
        }
	},
	mounted(){
	},
	watch: {
		openedNames () {
			this.$emit('on-open-change', this.openedNames);
		}
	},
    methods: {
		subString (item) {
			return item.substring(0, 2)
		},
		toRouter(toRouter,title){
			// console.log('toRouter=='+toRouter)
			let arr=[{'title':title,'icon':'','router':'',}];
            this.$store.commit("getBreadCrumbList",arr)
			this.$router.push({ path: '/'+toRouter })
		}
    }
}
</script>