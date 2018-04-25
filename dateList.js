(function(window){
    //日期表功能
    function dateList(){
        //定义变量年月日
        var year,month,day;
        this.year = '';
        this.month = '';
        this.day = '';
        //定义入口方法
        //参数:容器名,年份期限,初始年份(可选),初始月份(可选),初始日期(可选)
        this.ran = function(selectGroup,yearList,defaultYear,defaultMonth,defaultDay,cb){
            this.year = selectGroup + '-year';
            this.month = selectGroup + '-month';
            this.day = selectGroup + '-day';
            //检查调用时是否带初始年月日
            defaultYear = defaultYear || $('.'+this.year).val();
            defaultMonth = defaultMonth || $('.'+this.month).val();
            defaultDay = defaultDay || $('.'+this.day).val();

            
            if((defaultYear!=$('.'+this.year).val())||(defaultMonth!=$('.'+this.month).val())||(defaultDay!=$('.'+this.day).val())){
                var res = isValid(defaultYear,defaultMonth,defaultDay);
                if (res !== true) {
                    cb && cb.call(this,res);
                    return false;
                }
            }
            
            createSelect.call(this,selectGroup);
            changerYear.call(this,selectGroup,yearList,defaultYear,defaultMonth,defaultDay);
        }
        this.init = initTimeList;

        //创建年月日选择列表
        function createSelect(selectGroup){
            $('#'+selectGroup).append('<select class="'+ this.year +'" name="'+ this.year +'"></select>')
            $('#'+selectGroup).append('<select class="'+ this.month +'" name="'+ this.month +'"></select>')
            $('#'+selectGroup).append('<select class="'+ this.day +'" name="'+ this.day +'"></select>')
        }

        //根据不同的年份月数初始化年月日列表数据
        //参数:年||月||日,年||月||日范围(数组,[a,b],a>=b降序,a<=b升序),年||月||日具体汉字,初始值(可选)
        function initTimeList(theTime,forI,timeWord,defaultTime){
            $('.'+theTime).empty();
            $('.'+theTime).append('<option value="">--请选择--</option>');
            if(forI === false){
                return false;
            }
            if(forI[0]>=forI[1]){
                for(var i = forI[0];i>=forI[1];i--){
                    $('.'+theTime).append('<option value='+i+'>'+i+ timeWord +'</option>')
                }
            }else{
                for(var i = forI[0];i<=forI[1];i++){
                    $('.'+theTime).append('<option value='+i+'>'+i+ timeWord +'</option>')
                }
            }
            
            $('.'+theTime).val(defaultTime || '')
        }
        //判断每月天数
        function daysNum(year,month){ 
            var days = 30;
            switch(+month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12: 
                    days = 31;
                break;
                case 4:
                case 6:
                case 9:
                case 11:
                    days = 30;
                break;
                case 2:
                    if((year%4 == 0 && year %100 != 0) || year%400 == 0){
                        days = 29;
                    }else{
                        days = 28;
                    }
                break;
            }
            return days;
        }
        //对选择的年月日进行实时处理
        function changerYear(selectGroup,yearList,defaultYear,defaultMonth,defaultDay){
            
            var theYear = this.year;
            var theMonth = this.month;
            var theDay = this.day;
            
            $('.'+theYear).off('change');
            $('.'+theMonth).off('change');
            


            initTimeList(theYear,yearList,'年',defaultYear);
            initTimeList(theMonth,[1,12],'月',defaultMonth);
            //根据当前选择的年份,判断2月有多少天
            initTimeList(theDay,[1,daysNum(defaultYear,defaultMonth)],'日',defaultDay);
            
            addEvent(theYear,theMonth,theDay);

        }
        function between(num,max,min){
            if(!(min === 0||min ==="0")||min==undefined){
                min = min || 1;
            }
            if(typeof num != "number"){
                return false;
            }
            if(num>max){
                return false;
            }
            if(num<min){
                return false;
            }
            return true;
        }
        //判断初始年月日是否符合规定
        function isValid(defaultYear,defaultMonth,defaultDay){
            if(!between(defaultYear,2018,1970)){
                return '年份不合法';
            }
            if(!between(defaultMonth,12)){
                return '月份不合法';
            }
            var day = daysNum(defaultYear,defaultMonth);
            if(!between(defaultDay,day)){
                return '日期不合法';
            }
            return true;
        }
        //选择年月日的事件处理
        function addEvent(theYear,theMonth,theDay){
            //选择年份时的处理
            $('.'+theYear).on('change',function(){
                $('.'+theYear).val($(this).val());
                if($(this).val() == ''){
                    initTimeList(theMonth,false,'月');
                    initTimeList(theDay,false,'日');
                    return false;
                }
                //更改年份时初始化月份日期当前选择
                initTimeList(theMonth,[1,12],'月');
                initTimeList(theDay,[1,30],'日');
            })

            //选择月份时的处理
            $('.'+theMonth).on('change',function(){
                $('.'+theMonth).val($(this).val());
                if($(this).val() == ''){
                    initTimeList(theDay,false,'日');
                    return false;
                }
                year = $('.'+theYear).val();
                month = $(this).val();
                //更改月份时初始化当前日期
                initTimeList(theDay,[1,daysNum(year,month)],'日');
            })

            //选择日期时的处理
            $('.'+theDay).on('change',function(){
                $('.'+theDay).val($(this).val());
            })
        }

        this.initAll = function(){
            var theYear = "select-group-year";
            var theMonth = "select-group-month";
            var theDay = "select-group-day";
            initTimeList("select-group-year",[1970,2018],'年');
            initTimeList("select-group-month",false,'月');
            initTimeList("select-group-day",false,'日');
            addEvent(theYear,theMonth,theDay);
        }
    }
    //添加全局方法dateList
    window.dateList = dateList;
})(window)
