package cn.fenix.ry.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by zhangyuanxin on 2016/3/21.
 */
public class dateUtil {
    public static final String dateFormat = "yyyy-MM-dd HH:mm:ss";

    public static String dateToString(Date date){
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        return sdf.format(date);
    }
}
