<template>
  <a-list
    itemLayout="vertical"
    size="large"
    :pagination="pagination"
    :dataSource="listData"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        
        <template slot="actions" v-for="{type, text} in actions">
            <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{text}}
            </span>
        </template>
        <span slot="extra" style="background:red;color:#fff">1000元奖金</span>
        <a-list-item-meta
            :description="item.description"
        >
            <router-link slot="title" to="/competition/message">{{item.title}}</router-link>
            <a-badge slot="avatar" :count="item.status" :numberStyle="{background:'green','border-radius':'0'}">
                <img  width="120" alt="logo" :src="item.avatar" />
            </a-badge>
        </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://vue.ant.design/',
    title: `ant design vue part ${i}`,
    avatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2386514993,1599927311&fm=58&bpow=699&bpoh=508',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    status:'VIP'
  })
}

export default {
  data () {
    return {
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      },
      actions: [
        { type: 'star-o', text: '2019-10-10 09:12' },
        { type: 'like-o', text: '截至报名 倒计时15时36分' },
        { type: 'message', text: '在期|报名中' },
        { type: 'message', text: '初级 1080人参与' },
      ],
    }
  },
}
</script>
