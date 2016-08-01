# React PropTypes

## Objectives

1. Describe how to use `PropTypes` declarations
2. Describe why propTypes are a handy tool
3. Explain when to use `PropTypes.object` instead of `PropTypes.shape()`
4. Explain when to use `isRequired`

## Overview

This lesson should be reasonably straightforward, but it's important to give
students as much practice as possible. Frame it as some sort of story — maybe
we're at the DMV and we have to process documents, and they need to be of
specific types?

Anyway, I think students with a basic understanding of JavaScript will find most
PropTypes intuitive. The difference between `object` and `shape()` is something
that I happen to have strong opinions about though — feel free to disregard the
following and change the third objective if this seems too heavy-handed.

`PropTypes.object` is great for when we know we want some kind of object, but
we don't (yet) care what's in it. This is for wrapper or container components
that don't need to validate anything.

But usually, we'll want `PropTypes.shape()`, which is better for when we know
that we're going to be rendering specific parts of an object. We only need to
account for the specific parts that we're using the component we're in, but it
_really_ helps make components easy to understand.

Let's say we have an address component (DMVs need those), and we want to pull
the address information out of a `address` object. `shape()` is super handy:

```javascript
const React = require('react')
const PropTypes = React.PropTypes

class Address extends React.Component {
  // as with defaultProps, we'll need to include
  // the correct transform for this to work
  propTypes = {
    address: PropTypes.shape({
      streetAddress: PropTypes.string.isRequired,
      streetAddress2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired
    }
  }

  render() {
    // blah blah
  }
}
```

But if we have a bigger `User` component that takes the whole `user` object:

```javascript
const React = require('react')
const PropTypes = React.PropTypes

const Address = require('./components/Address.jsx')

class User extends React.Component {
  // as with defaultProps, we'll need to include
  // the correct transform for this to work
  propTypes = {
    user: PropTypes.shape({
      address: PropTypes.object.isRequired
    })
  }

  render() {
    return <Address address={this.props.user.address} />
  }
}
```

We only need to validate that `user.address` is defined here; we can wait until
`Address` renders to handle the details.

## Resources

- [npm](https://npmjs.org)
