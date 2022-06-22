## w11-220617-fri

### inline if with logical && operator
* conditional 함수
```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```

* boolean의 경우
```js
const [isLoading, setIsLoading] = useState(true);
...
<div className="findpwd-result">
  {isLoading ? "Loading..." : data}
</div>
```


