//获取应用实例
const app = getApp()
'use strict';
let choose_year = null,
    choose_month = null;
const conf = {
    data: {
        hasEmptyGrid: true,
        showPicker: false
    },
    onLoad() {
        const date = new Date();
        const cur_year = date.getFullYear();
        const cur_month = date.getMonth() + 1;
        const weeks_ch = [ '日', '一', '二', '三', '四', '五', '六' ];
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month);
        this.setData({
            cur_year,
            cur_month,
            weeks_ch
        });
    },
    // 计算每月有多少天
    getThisMonthDays(year, month) {
        return new Date(year, month, 0).getDate();
    },
    // 计算每月第一天是星期几
    getFirstDayOfWeek(year, month) {
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    // 计算在每月第一天在当月第一周之前的空余的天数
    calculateEmptyGrids(year, month) {
        const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
        let empytGrids = [];
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                empytGrids.push(i);
                console.log(empytGrids)
            }
            this.setData({
                hasEmptyGrid: true,                empytGrids

            });
        } else {
            this.setData({
                hasEmptyGrid: false,
                empytGrids: []
            });
        }
    },
    // 渲染日历格子
    calculateDays(year, month) {
        let days = [];

        const thisMonthDays = this.getThisMonthDays(year, month);

        for (let i = 1; i <= thisMonthDays; i++) {
            days.push({
                day: i,
                choosed: false
            });
        }

        this.setData({
            days
        });
    },
    // 递增、递减切换月份
    handleCalendar(e) {
        const handle = e.currentTarget.dataset.handle;
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });

        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);

            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            });
        }
    },
    // 点击日历上某一天
    tapDayItem(e) {
        const idx = e.currentTarget.dataset.idx;
        const days = this.data.days;
        days[ idx ].choosed = !days[ idx ].choosed;
        this.setData({
            days,
        });
    },
    // 点击年月调用picker选择器
    chooseYearAndMonth() {
        const cur_year = this.data.cur_year;
        const cur_month = this.data.cur_month;
        let picker_year = [],
            picker_month = [];
        for (let i = 1900; i <= 2100; i++) {
            picker_year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
            picker_month.push(i);
        }
        const idx_year = picker_year.indexOf(cur_year);
        const idx_month = picker_month.indexOf(cur_month);
        this.setData({
            picker_value: [ idx_year, idx_month ],
            picker_year,
            picker_month,
            showPicker: true,
        });
    },
    // 当picker选择器值改变时
    pickerChange(e) {
        const val = e.detail.value;
        choose_year = this.data.picker_year[val[0]];
        choose_month = this.data.picker_month[val[1]];
    },
    // 确定picker结果
    tapPickerBtn(e) {
        const type = e.currentTarget.dataset.type;
        const o = {
            showPicker: false,
        };
        if (type === 'confirm') {
            o.cur_year = choose_year;
            o.cur_month = choose_month;
            this.calculateEmptyGrids(choose_year, choose_month);
            this.calculateDays(choose_year, choose_month);
        }
        
        this.setData(o);
    },
    // 分享当前页面
    onShareAppMessage() {
        return {
            title: '姨妈日历',
            desc: '还是新鲜的日历哟',
            path: 'pages/index/index'
        };
    }
};

Page(conf);