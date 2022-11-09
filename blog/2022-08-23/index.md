---
slug: react-router-dom v6 路由参数
title: react-router-dom v6 路由参数
authors: [yvonne]
tags: [react,react-router-dom v6]
---

## 1. 通过state传参(HashRouter会丢失，BrowserRouter不会丢失)

传参页面
```javascript
import { useNavigate } from "react-router-dom";
const navigate = useNavigate()
navigate("/home",{state:{id:123}})
```

接收页面
```javascript
import { useLocation } from 'react-router-dom';
const location = useLocation()
const back = () => {
    console.log(location.state.id) //打印结果为123
}
```

由于state刷新后值还存在，有时需要删除值
```javascript
useEffect(() => {
  if (location.state?.id) {
    form.setFieldsValue({ id: location.state.id});
    let state = { ...location.state };
    delete state.id;
      navigate({ ...location, state });
  }
}, [form, history, location]);
```

##  2. 问号（？）形式传参（跳转新标签页只能用此携带参数）
传参页面
```javascript
import { useNavigate, createSearchParams } from "react-router-dom";
const navigate = useNavigate()
navigate("/home?id=123")
navigate({
    pathname: "/home", search: `?id=123` 
})
navigate({
    pathname: "/home",
    search: `?${createSearchParams({id:123})}`
})
```

接收页面
```javascript
import { useSearchParams } from "react-router-dom";
const [searchParams, setSearchParams] = useSearchParams();
const back = () => {
    console.log(searchParams.getAll('id')[0])  //打印结果为 123
    setSearchParams();  
}
```

## 3. params传参 (restful格式)，需要在Route上显示写明 :params

传参页面
```javascript
import { useNavigate } from "react-router-dom";  
<Route path={'/home/:id'} element={<ToPage/>} />
navigate(`/home/${id}`)
```

接收页面
```javascript
import { useParams } from "react-router-dom";
const ToPages = () => {
const { id } = useParams();
console.log(id)
}
```
 