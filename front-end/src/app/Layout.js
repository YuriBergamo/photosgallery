import React from 'react'
import PropTypes from 'prop-types'


import Site from './layout/Site'
import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'
import ContentRouter from './layout/Router'

const Layout = ({ children }) => (
    <Site style={{backgroundColor:"#e8e9e7"}}>
        <Header />
        <Content>
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">
                            This is my wedding photos gallery!
                        </h1>
                        <h2 class="subtitle">
                            You are wellcome to upload our best photos together!
                        </h2>
                    </div>
                </div>
            </section>
            <ContentRouter/>
        </Content>
        <Footer />
    </Site>
);

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout
