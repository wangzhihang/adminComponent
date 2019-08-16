<template>
    <div class="header-bar" >
        <Header :class="['headerBg',collapsed?'miniHeaderBg':'']">
            <div class="flexWrap" :class="['headerBg',collapsed?'miniHeaderBg':'']">
                <div class="logo-con" style="heiht:100%;">
                    <img src="../../../../assets/img/logo1.png" v-show="!collapsed" style="float: left;height: auto">
                    <img
					v-show="collapsed"
					src="../../../../assets/img/logo-white.png"
					style="width: 32px;height: 32px;display:inline-block;"
					title="华道生物CARTCPS"
				    >
                    <span style="line-height: 58px;color: #CAD0D7;font-size:12px;">&nbsp;CARTCPS</span>
                </div>
                <div class="header-con flex">
                    <span class="iconfont icontuichu" title="退出登录" style="font-size: 24px;"></span>
                    <span class="iconfont iconxiaoxi6" style="font-size: 26px;"></span>
                    <span style="font-size: 26px;" class="iconfont iconyoujian-yuanshijituantubiao" @click="handlepersonalEmail()">
                    </span>
                    <div style="display:inline-block" id="editpassword">
                        <Avatar icon="ios-person"  style="margin-top:-2px;"/>
                        <Dropdown trigger="click" class="dropDownColor" style="padding:0 10px;">
                            <a href="javascript:void(0)" style="color:#CAD0D7;">
                                <span style="font-size: 14px;">细胞制备经理</span>
                                <span class="iconfont iconxiala1" style="margin-left: 3px;"></span>
                            </a>
                            <DropdownMenu slot="list" class="dropdownBg">
                                <DropdownItem name="editPassword">细胞制备经理</DropdownItem>
                                <DropdownItem name="editPassword">角色1</DropdownItem>
                                <DropdownItem name="editPassword">角色2</DropdownItem>
                                <DropdownItem name="editPassword">角色3</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
         </Header>
    </div>
</template>
<script>
import './header-bar.less'
export default {
    name: 'HeaderBar',
    props:{
        collapsed:Boolean
    },
    data () {
        return {
            
        }
    },
    methods: {
        handlepersonalEmail(){
            this.axios.get('http://192.168.1.10:15080/usercenter/api//Info/GetEmailUrl').then((response) => {
                var newPage = window.open('', '_blank')
                newPage.location = 'https://exmail.qq.com/'
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
}
</script>