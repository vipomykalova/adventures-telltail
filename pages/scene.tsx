import React, {Component} from 'react';

import Layout from '../components/layout';
import Scene from "../components/scene";

import {SceneData} from "types";

interface IScenePageProps {
    adventure: string;
    sceneId: number;
}

interface IScenePageState {
    loading: boolean;
    error: boolean;

    data?: SceneData;
}

interface ISceneInitialProps {
    req: {params: {adventure: string; sceneId: string}};
    query: {adventure: string; sceneId: string};
}

export default class ScenePage extends Component<IScenePageProps, IScenePageState> {
    static getInitialProps({req, query}: ISceneInitialProps) {
        const adventure = req ?
            req.params.adventure :
            query.adventure;
        const sceneId = req ?
            req.params.sceneId :
            query.sceneId;

        return {adventure, sceneId};
    }

    state: IScenePageState = {
        loading: true,
        error: false
    };

    componentDidMount() {
        this.fetchScene();
    }

    componentDidUpdate(prevProps: IScenePageProps) {
        if (prevProps.adventure !== this.props.adventure || prevProps.sceneId !== this.props.sceneId) {
            this.fetchScene();
        }
    }

    fetchScene = () => {
        fetch(`/api/scene?adventure=${this.props.adventure}&sceneId=${this.props.sceneId}`)
            .then(response => {
                if (!response.ok) {
                    throw Error(`${response.status}`)
                }
                return response.json()
            })
            .then(data => this.setState({loading: false, data}))
            .catch(() => this.setState({loading: false, error: true}))
    };

    render() {
        const {loading, data, error} = this.state;
        if (loading) {
            return null;
        }
        if (!data || error) {
            return <p className="error">Сцена не найдена :(</p>;
        }

        return (
            <Layout>
                <Scene data={data} />
            </Layout>
        );
    }
}
