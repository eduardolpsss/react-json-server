import React, { Component } from "react";

import axios from 'axios'

import Main from "../template/Main";

const headerProps = {
    icon: 'users',
    title: 'Users',
    subtitle: 'User registration: create, read, update, and delete.'
}

const baseUrl = 'http://localhost:3001/users'

const initialState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    // Pegando dados do back-end e colocando em uma lista para colcoar na tabela
    componentWillMount() {
        axios(baseUrl)
            .then(resp => {
                this.setState({ list: resp.data })
            })
    }

    // Função para limpar estado do usuário
    clear() {
        this.setState({ user: initialState.user })
    }

    // Função para incluir um novo usuário ou alterar um usuário existente no banco
    save() {
        const user = this.state.user
        // Verificando se há ID, se houver fazer um PUT, senão fazer um POST
        const method = user.id ? 'put' : 'post'
        // Verificando se há id para passar ele pela URL, senão passar somente a URL padrão
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        // Chamando Axios para fazer a operação e passando estado do usuário e método
        axios[method] (url, user)
            .then(resp => {
                // Criando uma lista e pegando dados atualizados 
                const list = this.getUpdatedList(resp.data)
                // Setando os valores do usuário (novo ou tualizado)
                this.setState({ user: initialState.user, list })
            })
    }

    // Função que retorna uma lista atulizada com o último usuário em primeiro
    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        list.unshift(user)
        return list
    }

    // Função para alterar os campos do usuário
    updateField(event) {
        // Clonando o estado do usuário armazenando ele em uma variável para atualizar
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // Função para carregar usuários quando for alterá-lo
    load(user) {
        this.setState({ user })
    }

    // Função para remover usuários do banco
    remove(user){
        axios.delete(`${baseUrl}/@{user.id}`)
            .then(resp => {
                const list = this.getUpdatedList(null)
                this.setState({ list })
            })
    }

    // Função para renderizar a tabela do momento do banco de dados
    renderTable() {
        return(
            <table className="table mt-5">
                <thead>
                    <td>ID</td>
                    <td>Name</td>
                    <td>E-mail</td>
                    <td colSpan={2}>Actions</td>
                </thead>
                <tbody>
                    {/* Chamando a função renderRows que colocará as linhas na tabela */}
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    // Função que carregará as linhas da tabela
    renderRows() {
        return this.state.list.map( user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    // Função para renderizar o formulários de inserção ou atualização de usuários
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    {/* Colunas responsivas */}
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" name='name' value={this.state.user.name} onChange={e => this.updateField(e)} placeholder='Type your complete name'/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name='email' value={this.state.user.email} onChange={e => this.updateField(e)} placeholder='Type your e-mail'/>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}