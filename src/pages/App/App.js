import React, { Component } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
      book: []
    }
  }

  addToBook = (name) => {
    this.state.book.indexOf(name) === -1 ?
    this.setState({
      book: [...this.state.book, name]
    }) : null
  }

  searchRack = () => {
    fetch('/products', {
      method: 'POST',
      body: JSON.stringify({
        search: this.state.search
      }),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(products => this.setState({products}))
  }
  
handleChange = (field, e) => {
  this.setState({
    [field]: e.target.value
  });
}

  render() {
    return (
      <div className="app">
        <header>
          <h1>NRHL Hack Night! Search for products and click the ones that catch your eye to add them to your book!</h1>
          <input type="text" placeholder="search for products" value={this.state.search} onChange={(e) => this.handleChange('search', e)} />
          <button onClick={this.searchRack}>Search</button>
          {this.state.book.length > 0 ? <h3>Here's what you have in your book so far:</h3> : <h3>Products you add to your book will show up here.</h3> }
          {this.state.book.map(product => <div key={product}>{product}</div>)}
        </header>
        <div className="product-card-container">
        {this.state.products ?
          this.state.products.map((product, i) => 
            {return product._embedded['http://hautelook.com/rels/skus'][0]._links['http://hautelook.com/rels/original-images'][0] ? 
              <ProductCard
                name={product.name}
                brand={product.brand_name}
                description={product.description.substring(0, 150)}
                index={i}
                image={product._embedded['http://hautelook.com/rels/skus'][0]._links['http://hautelook.com/rels/original-images'][0].href.replace('{size}', 'smedium')}
                click={this.addToBook.bind(this, product.name)}
              />
            :
              <ProductCard
                name={product.name}
                brand={product.brand_name}
                description={product.description.substring(0, 150)}
                image={product._embedded['http://hautelook.com/rels/skus'][0]._links['http://hautelook.com/rels/original-images'].href.replace('{size}', 'smedium')}
                click={this.addToBook.bind(this, product.name)}
              />
              })
          : null
        }
        </div>
      </div>
    );
  }
}

export default App;
