import { Request, Response } from 'express'
import ListProductService from '../services/ListProductService'
import CreateProductService from '../services/CreateProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'
import ShowProductService from '../services/ShowPRoductService'

export default class ProductsController {
  public async index(request: Request, response: Response) {
    const listProducts = new ListProductService()

    const products = await listProducts.execute()

    return response.json(products)
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params
    const showProduct = new ShowProductService()
    const product = await showProduct.execute({ id })
    return response.json(product)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({
      name,
      price,
      quantity
    })
    return response.json(product)
  }

  public async upadate(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const { id } = request.params
    const updateProduct = new UpdateProductService()
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteProduct = new DeleteProductService()
    await deleteProduct.execute({ id })
    return response.json([])
  }
}
