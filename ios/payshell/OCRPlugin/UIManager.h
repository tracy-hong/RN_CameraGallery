//
//  UIManager.h
//  qipay
//
//  Created by wyht－ios－dev on 2018/3/12.
//  Copyright © 2018年 qitech. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UIManager : NSObject

+(UIViewController *) getCurrentVC;

+(NSString *) ImageResize:(NSString *)imgUrl;

@end
