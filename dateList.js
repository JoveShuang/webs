(function(window){
    function dateList(){
        var year,month,day;
        this.year = '';
        this.month = '';
        this.day = '';
        this.ran = function(selectGroup,yearList,defaultYear,defaultMonth,defaultDay){
            this.year = selectGroup + '-year';
            this.month = selectGroup + '-month';
            this.day = selectGroup + '-day';
            defaultYear = defaultYear || $('.'+this.year).val();
            defaultMonth = defaultMonth || $('.'+this.month).val();
            defaultDay = defaultDay || $('.'+this.day).val();

            createSelect.call(this,selectGroup);
            changerYear.call(this,selectGroup,yearList,defaultYear,defaultMonth,defaultDay);
        }
        this.init = initTimeList;
        function createSelect(selectGroup){
            $('#'+selectGroup).append('<select class="'+ this.year +'" name="'+ this.year +'"></select>')
            $('#'+selectGroup).append('<select class="'+ this.month +'" name="'+ this.month +'"></select>')
            $('#'+selectGroup).append('<select class="'+ this.day +'" name="'+ this.day +'"></select>')
        }
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
        function daysNum(year,month){
            //判断每月天数
            console.log(year,month);
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
            console.log(days);
            return days;
        }
        function changerYear(selectGroup,yearList,defaultYear,defaultMonth,defaultDay){
            var theYear = this.year;
            var theMonth = this.month;
            var theDay = this.day;
            $('.'+theYear).off('change');
            $('.'+theMonth).off('change');
            initTimeList(theYear,yearList,'年',defaultYear);
            initTimeList(theMonth,[1,12],'月',defaultMonth);
            initTimeList(theDay,[1,daysNum(year,month)],'日',defaultDay);

            $('.'+theYear).on('change',function(){
                $('.'+theYear).val($(this).val());
                if($(this).val() == ''){
                    initTimeList(theMonth,false,'月');
                    initTimeList(theDay,false,'日');
                    return false;
                }
                initTimeList(theMonth,[1,12],'月');
                initTimeList(theDay,[1,30],'日');
            })
            $('.'+theMonth).on('change',function(){
                $('.'+theMonth).val($(this).val());
                if($(this).val() == ''){
                    initTimeList(theDay,false,'日');
                    return false;
                }
                year = $(theYear).val();
                month = $(this).val();
                
                initTimeList(theDay,[1,daysNum(year,month)],'日');
            })
            $('.'+theDay).on('change',function(){
                $('.'+theDay).val($(this).val());
            })

        }
    }
    window.dateList = dateList;
})(window)
