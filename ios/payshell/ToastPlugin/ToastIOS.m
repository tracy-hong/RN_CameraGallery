//
//  ToastIOS.m
//  qipay
//
//  Created by wyht－ios－dev on 2018/7/3.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ToastIOS.h"
#import "iToast.h"

@implementation ToastIOS

// 导出模块，不添加参数即默认为这个类名
RCT_EXPORT_MODULE();

// 导出方法，桥接到js的方法返回值类型必须是void
RCT_EXPORT_METHOD(show:(NSString *)msg){
  [self showToastWithStr:msg Duration:2000];
}

-(void) showToastWithStr:(NSString *)str
                Duration:(int)duration {
  dispatch_async(dispatch_get_main_queue(), ^{
    [[[iToast makeText:str] setDuration:duration] show];
  });
}

@end
