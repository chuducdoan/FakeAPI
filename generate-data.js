// neu gap loi jsonServer.server() is not function thi chay: npm audit fix --force

const faker = require('faker')
const fs = require('fs')

// Set locale to use Vietnamese
faker.locale = 'vi'

const randomCategoryList = (n) => {
    if (n <= 0) return [];
    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createAt: Date.now(),
            updateAt: Date.now()
        };
        categoryList.push(category);
    })
    return categoryList;
}

const randomProductList = (categoryList, numberOfProduct) => {
    if (numberOfProduct <= 0) return [];
    const productList = [];
    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            const product = {
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createAt: Date.now(),
                updateAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(400, 400),
                categoryId: category.id
            };
            productList.push(product);
        })
    }
    return productList;
}

const randomBlogList = (n) => {
    if (n <= 0) return [];
    const blogList = [];

    Array.from(new Array(n)).forEach(() => {
        const blog = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            description: faker.commerce.productDescription(),
            createAt: Date.now(),
            updateAt: Date.now(),
            thumnailUrl: faker.image.imageUrl(400, 400),
            content: faker.lorem.paragraph()
        };
        blogList.push(blog);
    })
    return blogList;
}

const randomImageList = (productList, numberOfImage) => {
    if (numberOfImage <= 0) return [];
    const imageList = [];
    // random data
    for (const product of productList) {
        Array.from(new Array(numberOfImage)).forEach(() => {
            const image = {
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                createAt: Date.now(),
                updateAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(400, 400),
                productId: product.id
            };
            imageList.push(image);
        })
    }
    return imageList;
}

// IFFE
(() => {
    // random data
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);
    const imageList = randomImageList(productList, 3);
    const blogList = randomBlogList(4);

    // prepare db object
    const db = {
        categories: categoryList,
        products: productList,
        images: imageList,
        blogs: blogList,
        profile: {
            name: 'Pro'
        }
    };

    // Write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data succesfully')
    });
})();