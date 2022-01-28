import React from 'react';
import { Document, Page, Text,  StyleSheet} from '@react-pdf/renderer';


const Invoice = ({order}) => {
    return (
        <Document>
            <Page style={styles.body}>
               <Text style={styles.header} fixed>
                    {new Date().toLocaleString()}
                </Text>
                <Text style={styles.title}>
                    order invoice
                </Text>
                <Text style={styles.author}>
                    React Redux Ecommerce
                </Text>
                <Text style={styles.subtitle}>
                    order summary
                </Text>
                <table>
                    <thead>
                       <tr>
                           <th>
                           <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Color</th>
                            <th scope="col">Count</th>
                            <th scope="col">Shipping</th>
                           </th>
                       </tr>
                    </thead>
                </table>
                <table data={order.products}>
                    <tbody>
                       <tr>
                          <td getContent={(x) => x.product.title}/>
                          <td getContent={(x) => `$${x.product.price}`}/>
                          <td getContent={(x) => x.count}/>
                          <td getContent={(x) => x.product.brand}/>
                          <td getContent={(x) => x.product.color}/>
                       </tr>
                    </tbody>
                </table>

                <Text style={styles.text}>
                  <Text>
                      Date: {'               '}{new Date(order.paymentIntent.created * 1000).toLocaleString()}
                  </Text>
                  {"\n"}
                  <Text>
                    Order Id :{'          '}{order.paymentIntent.id}
                  </Text>
                  {"\n"}
                  <Text>
                    Order Status :{'   '}{order.orderStatus}
                  </Text>
                  {"\n"}
                  <Text>
                    Total Paid :{'       '}{order.paymentIntent.amount}
                  </Text>
                  {"\n"}
                  <Text style={styles.footer}>
                      Thank your for shopping with us 
                  </Text>
                </Text>
            </Page>

        </Document>
            
    
    );
};
const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

export default Invoice;