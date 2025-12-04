import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { theme } from '../styles/theme';

/**
 * Componente que exibe o resumo da compra
 */
const TotalSummary = ({ products }) => {
	const totalProducts = products.length;
	const purchasedProducts = products.filter(p => p.comprado).length;

	const totalValue = products.reduce((sum, product) => {
		return sum + (product.quantidade * product.precoUnitario);
	}, 0);

	const purchasedValue = products
		.filter(p => p.comprado)
		.reduce((sum, product) => {
			return sum + (product.quantidade * product.precoUnitario);
		}, 0);

	return (
		<Card style={styles.card}>
			<Card.Content>
				<Text style={styles.title}>Resumo da Compra</Text>

				<View style={styles.row}>
					<Text style={styles.label}>Total de produtos:</Text>
					<Text style={styles.value}>{totalProducts}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Produtos comprados:</Text>
					<Text style={styles.valueSuccess}>{purchasedProducts}</Text>
				</View>

				<View style={styles.divider} />

				<View style={styles.row}>
					<Text style={styles.label}>Valor total:</Text>
					<Text style={styles.valueTotal}>
						R$ {totalValue.toFixed(2)}
					</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Gasto atual:</Text>
					<Text style={styles.valueSuccess}>
						R$ {purchasedValue.toFixed(2)}
					</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.label}>Falta comprar:</Text>
					<Text style={styles.value}>
						R$ {(totalValue - purchasedValue).toFixed(2)}
					</Text>
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		margin: theme.spacing.md,
		elevation: 4,
		backgroundColor: theme.colors.surface
	},
	title: {
		fontSize: theme.fontSize.xlarge,
		fontWeight: 'bold',
		color: theme.colors.primary,
		marginBottom: theme.spacing.md
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: theme.spacing.sm
	},
	label: {
		fontSize: theme.fontSize.medium,
		color: theme.colors.textSecondary
	},
	value: {
		fontSize: theme.fontSize.medium,
		fontWeight: '600',
		color: theme.colors.text
	},
	valueSuccess: {
		fontSize: theme.fontSize.medium,
		fontWeight: '600',
		color: theme.colors.success
	},
	valueTotal: {
		fontSize: theme.fontSize.large,
		fontWeight: 'bold',
		color: theme.colors.primary
	},
	divider: {
		height: 1,
		backgroundColor: theme.colors.border,
		marginVertical: theme.spacing.sm
	}
});

export default TotalSummary;
