import Category from '../models/category-model';

function getAll(req, res) {
    let outData = [];

    Category.findAll()
    .then((categoriesPool) => {
        let len = categoriesPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                categoryId: categoriesPool[i]['pk_id'],
                categoryName: categoriesPool[i]['name'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get categories successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get categories"
        });
    });
}

export default { getAll };