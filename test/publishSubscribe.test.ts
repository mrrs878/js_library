/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2020-12-09 23:13:12
 * @LastEditTime: 2021-01-21 23:06:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jsLibrary\test\publishSubscribe.test.ts
 */
import PublishSubscribe from '../src/native/PublishSubscribe';

describe('test publishSubscribe', () => {
  it('should be defined', () => {
    expect(PublishSubscribe).toBeDefined();
  });

  it('multi listener to on publisher ', () => {
    const tom: any = {};
    function setAge(info: any) {
      tom.age = info.age;
    }
    function setSex(info: any) {
      tom.sex = info.sex;
    }
    PublishSubscribe.on('updateInfo', setAge);
    PublishSubscribe.on('updateInfo', setSex);
    PublishSubscribe.emit('updateInfo', { age: 32, sex: 'male' });
    expect(tom).toEqual({ age: 32, sex: 'male' });
  });

  it('multi listener to multi publisher', () => {
    const tom: any = {};
    function setAge(info: any) {
      tom.age = info.age;
    }
    function setWeekAge(info: any) {
      tom.age = info.age + 1;
    }
    function setSex(info: any) {
      tom.sex = info.sex;
    }
    PublishSubscribe.on('updateAge', setAge);
    PublishSubscribe.on('updateAge', setWeekAge);
    PublishSubscribe.on('updateSex', setSex);
    PublishSubscribe.emit('updateAge', { age: 32, sex: 'male' });
    PublishSubscribe.emit('updateSex', { age: 32, sex: 'male' });
    expect(tom).toEqual({ age: 33, sex: 'male' });
  });
});
