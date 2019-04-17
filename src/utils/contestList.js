import { listContest, myContest } from '@/common/api'

export function getListContest(t, data) {
    // console.log('data', data, data === undefined)

    if (data === undefined) {
        myContest()
        .then(res => {
            console.log('我的竞赛', res)
            if (res.code === 4401) {
                t.listData = []
                return t.$notification.error({
                    message: '注意',
                    description: '请先登陆用户',
                })
            } else if (res.code === 200) {
                handleTime(t, res)
            } else {
                t.listData = []
                return t.$notification.error({
                    message: '注意',
                    description: '获取失败',
                })
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        listContest(data)
        .then(res => {
            console.log('各类竞赛', res)
            handleTime(t, res)
        })
        .catch(err => {
            console.log(err);
        })
    }

}

function handleTime (t, res) {
    let that = t
    that.time = []
    // console.log(that.timerCount)
    for (let i=0;i<that.timerCount.length;i++) {
        clearInterval(that.timerCount[i])
    }
    that.timerCount = []
    that.listData = res.data.list || res.data
    for (let i = 0; i < that.listData.length; i++) {
        let end1 = new Date(that.listData[i].contentJoinTime)
        let end2 = new Date(that.listData[i].contestStartTime)
        let end3 = new Date(that.listData[i].contestEndTime)

        let tmp1 = (end1.getTime() - new Date().getTime()) / 1000
        let tmp2 = (end2.getTime() - new Date().getTime()) / 1000
        let tmp3 = (end3.getTime() - new Date().getTime()) / 1000

        let tmp, endtime
        if (tmp1 > 0) {
            tmp = tmp1
            endtime = end1.getTime()
            that.listData[i].tips = end1.toLocaleString() + " 截至报名"
            that.listData[i].color = "#87d068"
        } else if (tmp2 > 0) {
            tmp = tmp2
            endtime = end2.getTime()
            that.listData[i].tips = end2.toLocaleString() + " 开始竞赛"
            that.listData[i].color = "orange"
        } else if (tmp3 > 0) {
            tmp = tmp3
            endtime = end3.getTime()
            that.listData[i].tips = end3.toLocaleString() + " 结束竞赛"
            that.listData[i].color = "#f50"
        } else {
            that.time.push(null)
            tmp = 0
            that.listData[i].tips = end3.toLocaleString() + " 已结束"
            that.listData[i].color = "black"
        }

        if (tmp > 0) {
            that.time.push({
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
            })
            
                ; (function (a) {
                    that.timerCount.push(setInterval(function () {
                        let nowtime = new Date();
                        // let endtime = new Date("2019-05-28 19:20:00")
                        //   console.log(endtime)
                        var lefttime = parseInt(
                            (endtime - nowtime.getTime()) / 1000
                        )
                        let d = parseInt(lefttime / 3600 / 24);
                        let h = parseInt(lefttime / (60 * 60)) % 24;
                        let m = parseInt(lefttime / 60) % 60;
                        let s = parseInt(lefttime % 60);
                        that.time[a].day = d;
                        that.time[a].hour = h;
                        that.time[a].minute = m;
                        that.time[a].second = s;
                        // console.log('second='+s)
                    }, 1000))
                })(i);
        }
    }
}