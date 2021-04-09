// 父类
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat something`)
  }
}

// 子类
class Student extends People {
  constructor(name, number) {
    super(name)
    this.number = number
  }
  sayHi() {
    console.log(`姓名：${this.name} 学号：${this.number}`)
  }
}

// 子类
class Teacher extends People {
  constructor(name, major) {
    super(name)
    this.major = major
  }
  teach() {
    console.log(`${this.name} teach ${this.major}`)
  }
}

// 通过类 new 对象/实例
const xiaoming = new Student('小明', 100)
console.log(xiaoming.name, xiaoming.number)
xiaoming.sayHi()
xiaoming.eat()

const wanglaoshi = new Teacher('王老师', '语文')
console.log(wanglaoshi.name, wanglaoshi.major)
wanglaoshi.teach()
wanglaoshi.eat()
