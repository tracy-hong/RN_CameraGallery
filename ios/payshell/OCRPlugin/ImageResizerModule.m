//
//  ImageResizerModule.m
//  QipayReact
//
//  Created by wyht－ios－dev on 2018/7/5.
//  Copyright © 2018年 test. All rights reserved.
//

#import "ImageResizerModule.h"
#import "UIManager.h"

@implementation ImageResizerModule

// 导出模块，不添加参数即默认为这个类名
RCT_EXPORT_MODULE();

// 导出方法，桥接到js的方法返回值类型必须是void
RCT_EXPORT_METHOD(resize:(NSString *)path resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSString *url=[UIManager ImageResize:path];
    NSMutableDictionary *dic=[[NSMutableDictionary alloc] init];
    [dic setObject:url forKey:@"image_path"];
    resolve(dic);
}

@end
