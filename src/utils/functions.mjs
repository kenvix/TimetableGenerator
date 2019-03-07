export default () => {
    return {
        getHumanReadableClassTime: function(time) {
            switch (time) {
                case 0:
                    return "上午 1";
                case 1:
                    return "上午 2";
                case 2:
                    return "下午 1";
                case 3:
                    return "下午 2";
                case 4:
                    return "晚自习";
            }
        }
    };
}