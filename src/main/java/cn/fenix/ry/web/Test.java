package cn.fenix.ry.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/demo")
public class Test {

    @RequestMapping("/hello")
    @ResponseBody
    public Object hello(){
        return 
            new String[]{"Hello", "World!"};
    }
}