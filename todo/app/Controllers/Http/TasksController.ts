import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    const tasks = await Task.all()
    return response.json(tasks)
  }

  public async create({ request, response }: HttpContextContract) {
    const { name } = request.body()
    const task = new Task()
    task.name = name
    await task.save()
    return response.status(201).json(task)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.status(404).json({ message: 'Task not found' })
    }
    await task.delete()
    return response.status(204).json(null)
  }
}
