import "../../App.css";
import { Divider, Card, Row, Col } from 'antd';
const Home = () => {
    return (
        <div class="container">
            <h1>Jeu Shifumi</h1>
            <Divider/>
            <div class="card-container">
                <Row gutter={[16, 16]} class="card-container">
                    <Col span={12}>
                        <Card class="card" title="Card title">
                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae sapiente alias itaque neque magnam tempora provident atque aspernatur corrupti excepturi, quidem adipisci consectetur aliquam fugiat error eligendi. Quas, porro!
                            </p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card class="card" title="Card title">
                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae sapiente alias itaque neque magnam tempora provident atque aspernatur corrupti excepturi, quidem adipisci consectetur aliquam fugiat error eligendi. Quas, porro!
                            </p>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card class="card" title="Card title">
                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae sapiente alias itaque neque magnam tempora provident atque aspernatur corrupti excepturi, quidem adipisci consectetur aliquam fugiat error eligendi. Quas, porro!
                            </p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card class="card" title="Card title">
                            <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam recusandae sapiente alias itaque neque magnam tempora provident atque aspernatur corrupti excepturi, quidem adipisci consectetur aliquam fugiat error eligendi. Quas, porro!
                            </p>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Home;