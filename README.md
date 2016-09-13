# React PropTypes

## Objectives
1. Describe why propTypes are a handy tool
2. Describe how to use `PropTypes` declarations
3. Explain when to use `isRequired`
4. Explain when to use `PropTypes.object` instead of `PropTypes.shape()`

## What are PropTypes?
PropTypes is a way for us to enforce that components receive the right props in the right form. Basically, it's kind of
a developer-oriented validation: it catches errors when you pass the wrong stuff into a component, and warns you about
it. These warnings only show up in development versions of React — this stuff isn't checked in production versions
because of the overhead (and throwing the errors in production would be too little too late anyway). This helps with
code modularity and reuse, as running the code in development will clearly indicate if a component is being used in a
wrong way. This is especially helpful for working with multiple developers and big codebases.

A more concrete example: let's say we have some kind of profile card. The card uses several props: `firstName`,
`lastName`, `likes`, `gender`, and so on. It'd be great if we could validate our component to make sure the `firstName`
prop is passed in — otherwise our profile card would look kind of funky. Or, as another example, we expect `gender` to
be a string with the value `'male'`, `'female'` or `'unknown'`. We can achieve all of this stuff using PropTypes!

## Using PropTypes
![Ron Swanson](https://media.giphy.com/media/TyjjBG7GNdFxS/giphy.gif)

Let's pretend we're running a super modern ice cream store where orders are done through the computer and shown in the
browser using React. This means that we'd need some kind of `<Order />` component to represent all the delicious items
that people have ordered.

We'll take a moment to stop and think about how we want to represent our order. Which data (i.e.) props do we need? What
are the options? Are some of them required? Let's list them:

- `cone` — a boolean indicating if the ice cream should be in a cone, defaults to true
- `size` — a string to indicate the size of the order, defaults to `'regular'`
- `scoops` — an array of ice cream flavors
- `orderInfo` — an object containing data about the ice cream order

Our `<Order />` component would roughly look like this:

```js
class Order extends React.Component {
  render() {
    return (
      <div className="order">
        <ul>
          <li>{this.props.cone ? 'Cone' : 'Cup'}</li>
          <li>{this.props.size}</li>
          <li>{this.props.scoops.length} scoops: {this.props.scoops.join(', ')}</li>
          <li>Ordered by {this.props.orderInfo.customerName} at {this.props.orderInfo.orderedAt}.</li>
        </ul>
      </div>
    );
  }
}
```

Now that we know what our component will look like, let's add our default props (see the props list above). Afterwards,
we'll start adding PropTypes to validate all the props being passed in. We do so by setting the `propTypes` property
(which is an object) on the `Order` class:

```js
class Order extends React.Component {
  render() {
    // ...
  }
}

Order.defaultProps = {
  cone: true,
  size: 'regular'
};

Order.propTypes = {};
```

Let's add our first PropType, the `cone` one:

```js
Order.propTypes = {
  cone: React.PropTypes.bool
};
```

We just told our component to expect the `cone` prop to be a boolean. There are a couple of important things to note
here:
 
- Notice the capitalization: the property on the component class is always called `propTypes`, while
the React prop types you assign to them are capitalized as `PropTypes`. This is easy to mess up, so if our propTypes
don't validate, that's the first place we should look!
- Some types are not called what you'd expect them to be: a boolean is `bool`, a function is `func`, and so on. Using
the [reference on PropTypes][proptypes-reference] is
probably a good idea if you're just starting out with this stuff.

Let's add our second prop, the `size` one, which expects a string:

```js
Order.propTypes = {
  cone: React.PropTypes.bool,
  size: React.PropTypes.string
};
```

Next up is our scoops array:

```js
Order.propTypes = {
  cone: React.PropTypes.bool,
  size: React.PropTypes.string,
  scoops: React.PropTypes.array.isRequired
};
```

See the `isRequired` there? That makes sure the `scoops` prop is provided when rendering the component — we can't have
an order with no scoops of ice cream! To further validate the `scoops` prop, let's tell it we're expecting an _array of
strings_:

```js
Order.propTypes = {
  cone: React.PropTypes.bool,
  size: React.PropTypes.string,
  scoops: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};
```

That's better! Next, let's finish up by adding the last prop, the `orderInfo`:

```js
Order.propTypes = {
  cone: React.PropTypes.bool,
  size: React.PropTypes.string,
  scoops: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  orderInfo: React.PropTypes.object.isRequired
};
```

We've now fully validated all of the props that our `<Order />` component cares about. Now we can be sure that the right
data gets passed in, and if not, we can change things accordingly!

## Defining "shape" for object PropTypes
Something feels a little off, though... We told the `orderInfo` prop to expect an object, but can we be more specific?
We don't just need any object, we want an object with the properties (`customerName` and `orderedAt`) that we care
about!

Good news: we can! Using `React.PropTypes.shape`, we can tell our component to expect the prop to have a certain _shape_:

```js
Order.propTypes = {
  cone: React.PropTypes.bool,
  size: React.PropTypes.string,
  scoops: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  orderInfo: React.PropTypes.shape({
    customerName: React.PropTypes.string.isRequired,
    orderedAt: React.PropTypes.number.isRequired // We're using UNIX timestamps here
  }).isRequired
};
```

Using the `shape` PropType, we can further validate our component's props to be even more specific, and to be _doubly_
sure that we're getting the right data. Great success!

## Advanced usage of PropTypes
In this lesson, we've covered the basics of using PropTypes. There's much more validation you can do with it though,
including writing your own prop validators. For example, we could write a function that validates the `scoops` prop to
make sure that it has at least one scoop, and has flavors that we actually have in our store. Give it a try if you're
feeling adventurous! Be sure to check out the [reference on PropTypes][proptypes-reference] to guide you along the way.

## Resources
- [PropTypes reference][proptypes-reference]

[proptypes-reference]: [https://facebook.github.io/react/docs/reusable-components.html#prop-validation]
