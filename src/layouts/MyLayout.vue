<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          中央研究院大数据展示平台
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="power_settings_new"
          @click="backtoLogin"
        />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      behavior="mobile"
      v-model="leftDrawerOpen"
      :content-style="{'margin-top': '50px','width ':'240px'}"
      :content-class="$q.theme === 'mat' ?  'bg-primary text-grey-3 text-weight-thin':null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header class="text-grey-6">功能菜单</q-list-header>
        <q-item to="/">
          <q-item-side
            icon="waves"
            color="grey-5"
          />
          <q-item-main label="水质监测" />
        </q-item>
        <q-item to="/waterMark">
          <q-item-side
            icon="whatshot"
            color="grey-5"
          />
          <q-item-main label="异常标记" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="bg-primary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import api from 'assets/js/api'
import http from 'assets/js/http'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    backtoLogin () {
      window.location.href = 'http://210.14.69.81:5000/logout'
    }
  }
}
</script>

<style lang="stylus">
.router-link-exact-active, .q-list-link > .q-item:hover, .q-item-link:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.q-item.router-link-active {
  background: none;
}

html::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
